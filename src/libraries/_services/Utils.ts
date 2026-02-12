import { BaseEntity, EntityTarget, Repository } from "typeorm";
import { getDataSource } from "../connection";

export async function getConnection<T extends BaseEntity>(
  entity: EntityTarget<T>
): Promise<Repository<T>> {
  const ds = await getDataSource();
  return ds.getRepository(entity);
}
