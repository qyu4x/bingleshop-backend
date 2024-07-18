const categoryService = require("../src/service/category.service")
const categoryRepository = require("../src/repository/category.repository")
const { validate } = require("../src/helper/validation.helper")
const { ResponseError } = require("../src/error/response-error")
const { capitalizeEachFirstWord } = require("../src/helper/capitalize.helper")
const { v4: uuidv4 } = require("uuid")
jest.mock("../src/repository/category.repository")
jest.mock("../src/helper/validation.helper")
jest.mock("../src/helper/capitalize.helper")
jest.mock("uuid")

describe("Category Service", () => {
  describe("create", () => {
    it("should create a category successfully", async () => {
      const request = { name: "new category" }
      const validatedCategory = { name: "New Category" }

      validate.mockReturnValue(validatedCategory)
      capitalizeEachFirstWord.mockReturnValue("New Category")
      uuidv4.mockReturnValue("uuid")
      categoryRepository.findOneByName.mockResolvedValue(null)
      categoryRepository.create.mockResolvedValue(validatedCategory)

      const result = await categoryService.create(request)

      expect(validate).toHaveBeenCalledWith(expect.anything(), request)
      expect(capitalizeEachFirstWord).toHaveBeenCalledWith("New Category")
      expect(uuidv4).toHaveBeenCalled()
      expect(categoryRepository.findOneByName).toHaveBeenCalledWith(
        "New Category"
      )
      expect(categoryRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "uuid",
          name: "New Category",
          is_active: true,
          created_at: expect.any(Number),
        })
      )
      expect(result).toEqual(validatedCategory)
    })

    it("should throw an error if category already exists", async () => {
      const request = { name: "existing category" }
      const validatedCategory = { name: "Existing Category" }

      validate.mockReturnValue(validatedCategory)
      capitalizeEachFirstWord.mockReturnValue("Existing Category")
      categoryRepository.findOneByName.mockResolvedValue(validatedCategory)

      await expect(categoryService.create(request)).rejects.toThrow(
        ResponseError
      )

      expect(validate).toHaveBeenCalledWith(expect.anything(), request)
      expect(capitalizeEachFirstWord).toHaveBeenCalledWith("Existing Category")
      expect(categoryRepository.findOneByName).toHaveBeenCalledWith(
        "Existing Category"
      )
    })
  })

  describe("list", () => {
    it("should return a list of categories", async () => {
      const categories = [{ id: "1", name: "Category 1" }]
      categoryRepository.findAll.mockResolvedValue(categories)

      const result = await categoryService.list()

      expect(categoryRepository.findAll).toHaveBeenCalled()
      expect(result).toEqual(categories)
    })
  })

  describe("remove", () => {
    it("should remove a category successfully", async () => {
      const category = {
        id: "1",
        name: "Category 1",
        is_active: true,
        save: jest.fn(),
      }
      categoryRepository.findOneById.mockResolvedValue(category)

      await categoryService.remove("1")

      expect(categoryRepository.findOneById).toHaveBeenCalledWith("1")
      expect(category.is_active).toBe(false)
      expect(category.updated_at).toBeDefined()
      expect(category.save).toHaveBeenCalled()
    })

    it("should throw an error if category not found", async () => {
      categoryRepository.findOneById.mockResolvedValue(null)

      await expect(categoryService.remove("1")).rejects.toThrow(ResponseError)

      expect(categoryRepository.findOneById).toHaveBeenCalledWith("1")
    })
  })

  describe("checkCategoryMustExist", () => {
    it("should return the category ID if category exists", async () => {
      const category = { id: "1" }
      categoryRepository.findOneById.mockResolvedValue(category)

      const result = await categoryService.checkCategoryMustExist("1")

      expect(categoryRepository.findOneById).toHaveBeenCalledWith("1")
      expect(result).toBe("1")
    })

    it("should throw an error if category not found", async () => {
      categoryRepository.findOneById.mockResolvedValue(null)

      await expect(categoryService.checkCategoryMustExist("1")).rejects.toThrow(
        ResponseError
      )

      expect(categoryRepository.findOneById).toHaveBeenCalledWith("1")
    })
  })
})
