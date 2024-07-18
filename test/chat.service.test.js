const chatService = require("../src/service/chat.service")
const chatRepository = require("../src/repository/chat.repository")
const { v4: uuidv4 } = require("uuid")

jest.mock("../src/repository/chat.repository")
jest.mock("uuid")

describe("Chat Service", () => {
  describe("saveChat", () => {
    it("should save a chat message successfully", async () => {
      const userIdSender = "user1"
      const userIdRecipient = "user2"
      const message = "Hello, how are you?"
      const uuid = "unique-id"
      const chat = {
        id: uuid,
        user_id_sender: userIdSender,
        user_id_recipient: userIdRecipient,
        message: message,
      }

      uuidv4.mockReturnValue(uuid)
      chatRepository.create.mockResolvedValue(chat)

      const result = await chatService.saveChat(
        userIdSender,
        userIdRecipient,
        message
      )

      expect(uuidv4).toHaveBeenCalled()
      expect(chatRepository.create).toHaveBeenCalledWith({
        id: uuid,
        user_id_sender: userIdSender,
        user_id_recipient: userIdRecipient,
        message: message,
      })
      expect(result).toEqual(chat)
    })
  })
})
