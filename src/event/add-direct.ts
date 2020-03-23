import {StoreObj} from "../@types/store";
import {PERMISSION_DEFAULT, Resister} from "../server";
import {getMaxOrder, getOwner, registCollectionName, setEvent} from "./common";
import Driver from "nekostore/lib/Driver";
import {ApplicationError} from "../error/ApplicationError";
import {AddDirectRequest} from "../@types/socket";
import DocumentReference from "nekostore/src/DocumentReference";

// インタフェース
const eventName = "add-direct";
type RequestType = AddDirectRequest;
type ResponseType = string[];

/**
 * データ作成処理
 * @param driver
 * @param exclusionOwner
 * @param arg
 */
async function addDirect(driver: Driver, exclusionOwner: string, arg: RequestType): Promise<ResponseType> {
  const { c, maxOrder } = await getMaxOrder<any>(driver, arg.collection);
  let order = maxOrder + 1;

  const owner = await getOwner(driver, exclusionOwner, arg.option ? arg.option.owner : undefined);
  const permission = arg.option && arg.option.permission || PERMISSION_DEFAULT;

  const docIdList: string[] = [];

  const addFunc = async (data: any): Promise<void> => {
    const addInfo: StoreObj<any> = {
      order: order++,
      exclusionOwner: null,
      lastExclusionOwner: null,
      owner,
      status: "added",
      createTime: new Date(),
      updateTime: new Date(),
      permission,
      data
    };
    try {
      const docRef: DocumentReference<any> = await c.add(addInfo);
      docIdList.push(docRef.id);
    } catch (err) {
      throw new ApplicationError(`Failure add doc.`, addInfo);
    }
  };

  // collectionの記録
  await registCollectionName(driver, arg.collection);

  // 直列の非同期で全部実行する
  await arg.dataList
    .map((data: any) => () => addFunc(data))
    .reduce((prev, curr) => prev.then(curr), Promise.resolve());

  return docIdList;
}

const resist: Resister = (driver: Driver, socket: any): void => {
  setEvent<RequestType, ResponseType>(driver, socket, eventName, (driver: Driver, arg: RequestType) => addDirect(driver, socket.id, arg));
};
export default resist;
