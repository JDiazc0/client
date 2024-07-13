import getBalances from "../Balance/getBalances";
import updateBalance from "../Balance/updateBalance";
import uploadBalance from "../Balance/uploadBalance";
import updateInventory from "../Inventory/updateInventory";
import deleteOrder from "../Order/deleteOrder";
import dayjs from "dayjs";

export async function getCurrentMonthBalance() {
  try {
    const { balances } = await getBalances();
    const currentMonth = dayjs().startOf("month").toISOString();

    const balance = balances.find((balance) => {
      const balanceMonth = dayjs(balance.month).startOf("month").toISOString();
      return balanceMonth === currentMonth;
    });

    return balance || null;
  } catch (error) {
    console.error("Error fetching current month balance:", error);
    return null;
  }
}

// Actualizar o crear el balance del mes actual
export async function updateOrCreateBalance(orderPrice, materialsCost) {
  try {
    const currentMonth = dayjs().startOf("month").toISOString(); // Convertir a ISO string

    const balance = await getCurrentMonthBalance();

    if (balance) {
      // Actualizar el balance existente
      const updatedIncome = (balance.income || 0) + orderPrice;
      const updatedExpenses = (balance.expenses || 0) + materialsCost;

      await updateBalance(
        balance._id,
        currentMonth,
        updatedIncome,
        updatedExpenses
      );
    } else {
      // Crear un nuevo balance
      await uploadBalance(
        currentMonth,
        Number(orderPrice),
        Number(materialsCost)
      );
    }
  } catch (error) {
    console.error("Error updating or creating balance:", error);
  }
}
// Restar productos del inventario utilizados en el pedido
export async function updateInventoryForOrder(order, inventory) {
  try {
    for (const orderProduct of order.products) {
      const inventoryItem = inventory.find(
        (item) => item.product_id === orderProduct.id
      );
      if (inventoryItem) {
        const newAmount = Math.max(
          0,
          inventoryItem.quantity - orderProduct.quantity
        );

        console.log(
          inventoryItem.inventory_id,
          inventoryItem.product_id,
          Number(newAmount)
        );
        await updateInventory(
          inventoryItem.inventory_id,
          inventoryItem.product_id,
          Number(newAmount)
        );
      }
    }
  } catch (error) {
    console.error("Error updating inventory for order:", error);
  }
}

// Eliminar el pedido de la lista de pedidos
export async function removeOrder(orderId) {
  try {
    await deleteOrder(orderId);
  } catch (error) {
    console.error("Error deleting order:", error);
  }
}
