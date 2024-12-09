import  Axios  from 'axios';
const BASE_URL = "http://127.0.0.1:3001/api/todo/";

export default class TaskApi {
  static async addTask(data) {
    try {
      //console.log("Payload being sent:", data); 
      //const response = await Axios.post(BASE_URL, data); 
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200 || response.status === 201) {
        return response.data; 
      } else {
        console.error("Error response from server:", response);
        throw new Error('Failed to add task');
      }
    } catch (error) {
      console.error("Error in addTask:", error);
      throw error;
    }
  }


  static async deleteTask(id) {
    try {
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(id, description) {
    try {
      console.log('Sending request to update task:', { id, description });
      const response = await fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(description),
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to update task');
      }
    } catch (error) {
      throw error;
    }
  }

  static async toggleTaskCompletion(id) {
    try {
      const response = await fetch(`${BASE_URL}${id}/complete`, {
        method: 'PUT',
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to toggle task completion');
      }
    } catch (error) {
      throw error;
    }
  }
}
