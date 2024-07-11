export const transformProductsData = (order) => {
  return order.products.map((orderProduct) => {
    return {
      name: orderProduct.product.name,
      quantity: orderProduct.quantity,
      price: orderProduct.product.price,
      totalPrice:
        Number(orderProduct.quantity) * Number(orderProduct.product.price),
    };
  });
};

export const calculateMaterialsWithInventory = (order, inventory) => {
  const materialsMap = {};

  order.products.forEach((orderProduct) => {
    const product = orderProduct.product;
    const quantityNeeded = orderProduct.quantity;

    // Buscar el producto en el inventario
    const inventoryItem = inventory.find(
      (item) => item.product._id === product._id
    );
    const inventoryQuantity = inventoryItem ? inventoryItem.amount : 0;

    // Calcular la cantidad que falta producir
    const quantityToProduce = Math.max(0, quantityNeeded - inventoryQuantity);

    // Calcular las materias primas necesarias para la cantidad a producir
    product.materials.forEach((material) => {
      const materialId = material.material._id;
      const requiredQuantity = material.quantity * quantityToProduce;

      if (!materialsMap[materialId]) {
        materialsMap[materialId] = {
          material: material.material,
          totalQuantity: 0,
        };
      }

      materialsMap[materialId].totalQuantity += requiredQuantity;
    });
  });

  // Convertir el mapa de materias primas en una lista
  return Object.values(materialsMap).map((materialData) => {
    const { material, totalQuantity } = materialData;
    const unitsToBuy = Math.ceil(totalQuantity / material.weight);
    const totalCost = unitsToBuy * material.cost;

    return {
      material: material.name,
      totalQuantity,
      unitsToBuy,
      totalCost,
    };
  });
};

export const filterInventoryData = (order, inventory) => {
  return inventory.filter((inventoryItem) =>
    order.products.some(
      (orderProduct) => orderProduct.product._id === inventoryItem.product._id
    )
  );
};
