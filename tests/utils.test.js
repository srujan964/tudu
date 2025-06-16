import { jest } from "@jest/globals";
import { DiscordRequest, InstallGlobalCommands } from "../src/utils";

global.fetch = jest.fn().mockResolvedValue({
	ok: true,
	json: jest.fn().mockResolvedValue("foo"),
});

describe("utils tests", () => {
	const ENV = process.env;

	afterAll(() => {
		process.env = ENV;
	});

	it("should call the bulk update API", async () => {
		const commands = {
			test: "this is a command",
		};
		const appId = "test-app-id";
		process.env.DISCORD_TOKEN = "token";

		const resp = await InstallGlobalCommands(appId, commands);

		expect(fetch).toHaveBeenCalledWith(
			`https://discord.com/api/v10/applications/${appId}/commands`,
			{
				method: "PUT",
				headers: {
					Authorization: "Bot token",
					"Content-Type": "application/json; charset=UTF-8",
					"User-Agent": "DiscordBot (1.0.0)",
				},
				body: JSON.stringify(commands),
			},
		);
	});
});
