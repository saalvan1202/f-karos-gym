import axios from "axios";
export const PATH = "https://web-production-85e5.up.railway.app";
export async function axiosGet(url, setState, setData) {
  try {
    setState(false);
    const response = await axios.get(url);
    setData(response.data);
    setState(true);
  } catch (error) {
    console.log(error);
    setState(true);
  }
}
export async function axiosPost(url, data, setState, setModal) {
  setState(true);
  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    setState(false);
    if (setModal) {
      setModal(false);
    }
  } catch (error) {
    console.log(error);
    setState(false);
  }
}
export async function axiosEdit(url, setData, setState, setModal) {
  setState(true);
  try {
    const response = await axios.get(url);
    setData(response.data);
    setState(false);
    setModal(true);
  } catch (error) {
    console.log(error);
    setState(false);
  }
}
export async function axiosDelete(url, setState, setModal) {
  try {
    const response = await axios.delete(url);
    console.log(response.data);
    setState(false);
    if (setModal) {
      setModal(false);
    }
  } catch (error) {
    console.log(error);
    setState(false);
  }
}
