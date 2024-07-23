import prismaClient from "../prisma";

async function validateStore(storeId: number) {
  const store = await prismaClient.store.findUnique({
    where: {id: storeId}
  });
  if (!storeId) throw new Error("Invalid store id.");
  if (!store) throw new Error("Store not found.");

  return store;
}
export { validateStore };