import { toast } from "react-toastify"

const validateItem = (item) => {
  try {
    item.name = String(item.name)
    item.mass = Number(item.mass)
    item.x = Number(item.x)
    item.y = Number(item.y)
    item.z = Number(item.z)
    if (isNaN(item.mass) || isNaN(item.x) || isNaN(item.y) || isNaN(item.z)) {
      throw new Error("That item was invalid, try again")
    }
    return item
  } catch (e) {
    toast.error(e.message)
    return false
  }
}

export default validateItem
