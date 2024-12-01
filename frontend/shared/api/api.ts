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
}

export const api = new API("http://localhost:4000");

// export const api = new API("https://api.pvb-university.com");
