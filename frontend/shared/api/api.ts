import { Customer, Item, Order, User } from "../types";

class API {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Асинхронный метод для авторизации
  signInRequest = async (input: { username: string; password: string }) => {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Sign-in request failed:", error);
      throw error;
    }
  };
  // Асинхронный метод для получения всех пользователей
  getAllUsersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get users request failed:", error);
      throw error;
    }
  };
  // запрос на получение данных пользователя по id
  getUserByIdAdminRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get users request failed:", error);
      throw error;
    }
  };
  createUserRequest = async (input: User, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create user request failed:", error);
      throw error;
    }
  };
  updateUserRequest = async (input: User, token: string) => {
    if (!input.id) {
      throw new Error("User ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update user request failed:", error);
      throw error;
    }
  };
  deleteUserRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete user request failed:", error);
      throw error;
    }
  };
  getAllCustomersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get customers request failed:", error);
      throw error;
    }
  };
  // запрос на получение заказчика по id
  getCustomerByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get customers request failed:", error);
      throw error;
    }
  };

  //запрос на создание заказчика
  createCustomerRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create customer request failed:", error);
      throw error;
    }
  };
  // запрос на обновление заказчика
  updateCustomerRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Customer ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/customers/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update customer request failed:", error);
      throw error;
    }
  };
  // запрос на удаление заказчика
  deleteCustomerRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/customers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete customer request failed:", error);
      throw error;
    }
  };
  // запрос на получение всех заказов
  getAllOrdersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get orders request failed:", error);
      throw error;
    }
  };
  // запрос на получение заказа по id
  getOrderByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get order request failed:", error);
      throw error;
    }
  };
  // запрос на обновление заказа
  updateOrderRequest = async (input: Order, token: string) => {
    if (!input.id) {
      throw new Error("Order ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/orders/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update order request failed:", error);
      throw error;
    }
  };
  //запрос на создание заказа
  createOrderRequest = async (input: Order, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create order request failed:", error);
      throw error;
    }
  };
  // запрос на удаление заказа
  deleteOrderRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/orders/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete order request failed:", error);
      throw error;
    }
  };
  // запрос на обновление позиции
  updateItemRequest = async (input: Item, token: string) => {
    if (!input.id) {
      throw new Error("Item ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/items/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update item request failed:", error);
      throw error;
    }
  };
  createItemRequest = async (input: Item, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create item request failed:", error);
      throw error;
    }
  };
  // запрос на получение справочника вида оборудования
  getAllEquipmentTypesRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/equipment-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get equipment-types request failed:", error);
      throw error;
    }
  };
  // запрос на получение вида оборудования по id
  getEquipmentTypeByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/equipment-types/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get equipment-types request failed:", error);
      throw error;
    }
  };

  //запрос на создание вида оборудования
  createEquipmentTypeRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/equipment-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create equipment-types request failed:", error);
      throw error;
    }
  };
  // запрос на обновление вида оборудования
  updateEquipmentTypeRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Equipment type ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/equipment-types/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update equipment-types request failed:", error);
      throw error;
    }
  };
  // запрос на удаление вида оборудования
  deleteEquipmentTypeRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/equipment-types/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete equipment-types request failed:", error);
      throw error;
    }
  };
  // запрос на получение справочника типа оборудования
  getAllProductTypesRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/product-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get product-types request failed:", error);
      throw error;
    }
  };
  // запрос на получение типа оборудования по id
  getProductTypeByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/product-types/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get product-types request failed:", error);
      throw error;
    }
  };

  //запрос на создание типа оборудования
  createProductTypeRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/product-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create product-types request failed:", error);
      throw error;
    }
  };
  // запрос на обновление типа оборудования
  updateProductTypeRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Product type ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/product-types/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update product-types request failed:", error);
      throw error;
    }
  };
  // запрос на удаление типа оборудования
  deleteProductTypeRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/product-types/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete product-types request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника конструкции оборудования
  ////////////////////
  getAllConstructionsRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/constructions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get constructions request failed:", error);
      throw error;
    }
  };
  // запрос на получение конструкции оборудования по id
  getConstructionByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/constructions/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get constructions request failed:", error);
      throw error;
    }
  };

  //запрос на создание конструкции оборудования
  createConstructionRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/constructions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create constructions request failed:", error);
      throw error;
    }
  };
  // запрос на обновление конструкции оборудования
  updateConstructionRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Constructions ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/constructions/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update constructions request failed:", error);
      throw error;
    }
  };
  // запрос на удаление конструкции оборудования
  deleteConstructionRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/constructions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete constructions request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника стандарта изготовления
  ////////////////////
  getAllManufacturingStandartsRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/manufacturing-standarts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get manufacturing-standarts request failed:", error);
      throw error;
    }
  };
  // запрос на получение стандарта изготовления по id
  getManufacturingStandartByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/manufacturing-standarts/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get manufacturing-standarts request failed:", error);
      throw error;
    }
  };

  //запрос на создание стандарта изготовления
  createManufacturingStandartRequest = async (
    input: Customer,
    token: string
  ) => {
    try {
      const response = await fetch(`${this.baseUrl}/manufacturing-standarts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create manufacturing-standarts request failed:", error);
      throw error;
    }
  };
  // запрос на обновление стандарта изготовления
  updateManufacturingStandartRequest = async (
    input: Customer,
    token: string
  ) => {
    if (!input.id) {
      throw new Error("ManufacturingStandarts ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/manufacturing-standarts/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update manufacturing-standarts request failed:", error);
      throw error;
    }
  };
  // запрос на удаление стандарта изготовления
  deleteManufacturingStandartRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/manufacturing-standarts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete manufacturing-standarts request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника ДУ
  ////////////////////
  getAllDiametersRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/diameters`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get diameters request failed:", error);
      throw error;
    }
  };
  // запрос на получение стандарта изготовления по id
  getDiameterByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/diameters/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get diameters request failed:", error);
      throw error;
    }
  };

  //запрос на создание стандарта изготовления
  createDiameterRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/diameters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create diameters request failed:", error);
      throw error;
    }
  };
  // запрос на обновление стандарта изготовления
  updateDiameterRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Diameters ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/diameters/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update diameters request failed:", error);
      throw error;
    }
  };
  // запрос на удаление стандарта изготовления
  deleteDiameterRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/diameters/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete diameters request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника РУ
  ////////////////////
  getAllClassPressuresRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/class-pressure`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get class-pressure request failed:", error);
      throw error;
    }
  };
  // запрос на получение РУ по id
  getClassPressureByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/class-pressure/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get class-pressure request failed:", error);
      throw error;
    }
  };

  //запрос на создание РУ
  createClassPressureRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/class-pressure`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create class-pressure request failed:", error);
      throw error;
    }
  };
  // запрос на обновление РУ
  updateClassPressureRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("ClassPressures ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/class-pressure/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update class-pressure request failed:", error);
      throw error;
    }
  };
  // запрос на удаление РУ
  deleteClassPressureRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/class-pressure/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete class-pressure request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника классов герметичности
  ////////////////////
  getAllTightnessClassRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/tightness-classes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get tightness-classes request failed:", error);
      throw error;
    }
  };
  // запрос на получение класса герметичности по id
  getTightnessClassByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/tightness-classes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get tightness-classes request failed:", error);
      throw error;
    }
  };

  //запрос на создание класса герметичности
  createTightnessClassRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/tightness-classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create tightness-classes request failed:", error);
      throw error;
    }
  };
  // запрос на обновление класса герметичности
  updateTightnessClassRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("TightnessClass ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/tightness-classes/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update tightness-classes request failed:", error);
      throw error;
    }
  };
  // запрос на удаление класса герметичности
  deleteTightnessClassRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/tightness-classes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete tightness-classes request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника температурного диапазона
  ////////////////////
  getAllTemperatureRangeRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/temperature-ranges`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get temperature-ranges request failed:", error);
      throw error;
    }
  };
  // запрос на получение температурного диапазона по id
  getTemperatureRangeByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/temperature-ranges/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get temperature-ranges request failed:", error);
      throw error;
    }
  };

  //запрос на создание температурного диапазона
  createTemperatureRangeRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/temperature-ranges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create temperature-ranges request failed:", error);
      throw error;
    }
  };
  // запрос на обновление класса герметичности
  updateTemperatureRangeRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("TemperatureRange ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/temperature-ranges/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update temperature-ranges request failed:", error);
      throw error;
    }
  };
  // запрос на удаление температурного диапазона
  deleteTemperatureRangeRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/temperature-ranges/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete temperature-ranges request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника материалов
  ////////////////////
  getAllMaterialsRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/materials`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get materials request failed:", error);
      throw error;
    }
  };
  // запрос на получение материалов по id
  getMaterialByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/materials/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get materials request failed:", error);
      throw error;
    }
  };

  //запрос на создание материалов
  createMaterialRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create materials request failed:", error);
      throw error;
    }
  };
  // запрос на обновление материалов
  updateMaterialRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("Material ID is required for updating");
    }

    try {
      const response = await fetch(`${this.baseUrl}/materials/${input.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update materials request failed:", error);
      throw error;
    }
  };
  // запрос на удаление материалов
  deleteMaterialRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete materials request failed:", error);
      throw error;
    }
  };
  ////////////////////////////
  // запрос на получение справочника типов соединения
  ////////////////////
  getAllConnectionTypesRequest = async (token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/connection-types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get connection-types request failed:", error);
      throw error;
    }
  };
  // запрос на получение типов соединения по id
  getConnectionTypeByIdRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/connection-types/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get connection-types request failed:", error);
      throw error;
    }
  };

  //запрос на создание типов соединения
  createConnectionTypeRequest = async (input: Customer, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/connection-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Create connection-types request failed:", error);
      throw error;
    }
  };
  // запрос на обновление типов соединения
  updateConnectionTypeRequest = async (input: Customer, token: string) => {
    if (!input.id) {
      throw new Error("ConnectionType ID is required for updating");
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/connection-types/${input.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Update connection-types request failed:", error);
      throw error;
    }
  };
  // запрос на удаление типов соединения
  deleteConnectionTypeRequest = async (id: number, token: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/connection-types/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Delete connection-types request failed:", error);
      throw error;
    }
  };
}

export const api = new API("http://localhost:4000");

// export const api = new API("https://api.pvb-university.com");
