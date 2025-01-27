/** @format */

// Author: Animatak_ \\

const Main = new NativeClass('Terraria', 'Main');
const Player = new NativeClass('Terraria', 'Player');
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const nColor = Color.new()['void .ctor(int r, int g, int b, int a)'];

import { translater } from './translater.js';

function playerCenterTileX(player) {
	return Math.floor(player.Center.X / 16);
}

function playerCenterTileY(player) {
	return Math.floor(player.Center.Y / 16);
}

function inGameWorld(x, y, worldWidth, worldHeight) {
	return x > 39 && x < worldWidth - 39 && y > 39 && y < worldHeight - 39;
}

function coordsString(x, y) {
	const worldCenterX = Main.maxTilesX / 2;
	const surfaceLevel = Main.worldSurface;
	const rockLayer = Main.rockLayer;

	const xOffset = x - worldCenterX;
	const xDirection = xOffset < 0 ? `${translater.West()}` : `${translater.East()}`;
	const absXOffset = Math.abs(xOffset);

	const yOffset = y - surfaceLevel;
	let yLevel;
	if (y < surfaceLevel) {
		yLevel = `${translater.Surface()}`;
	} else if (y < rockLayer) {
		yLevel = `${translater.Underground()}`;
	} else {
		yLevel = `${translater.Cave()}`;
	}

	return `${absXOffset * 2} ${xDirection}, ${Math.abs(yOffset * 2)} ${yLevel}.`;
}

function planteraBulb(x, y) {
	try {
		if (x < 0 || y < 0 || x >= Main.maxTilesX || y >= Main.maxTilesY) {
			return false;
		}

		const tile = Main.tile.get_Item(x, y);
		if (tile && tile.type == 238) {
			const locationMessage = coordsString(x, y);
			Main.NewText(`${translater.BulbFinded()}, ${locationMessage}`, 0, 255, 0);
			return true;
		}

		return false;
	} catch (error) {
		return false;
	}
}

let searchInProgress = false;
let searchXStart = 0;
let searchXEnd = 0;
let searchY = 0;
let searchGap = 2;
let searchWorldWidth = 0;
let searchWorldHeight = 0;
let searchCallback = null;

function searchPlanteraIncremental() {
	if (!searchInProgress) return;

	for (let i = 0; i < 100; i++) {
		if (searchY < searchWorldHeight) {
			for (let x = searchXStart; x <= searchXEnd; x += searchGap) {
				if (inGameWorld(x, searchY, searchWorldWidth, searchWorldHeight) && planteraBulb(x, searchY)) {
					searchCallback(true);
					searchInProgress = false;
					return;
				}
			}
		}

		searchY += searchGap;

		if (searchY >= searchWorldHeight) {
			searchCallback(false);
			searchInProgress = false;
			return;
		}
	}
}

function startPlanteraSearch(player, worldWidth, worldHeight, gap, callback) {
	if (searchInProgress) return;

	const playerX = playerCenterTileX(player);
	const playerY = playerCenterTileY(player);

	searchInProgress = true;
	searchXStart = Math.max(playerX - 400, 0);
	searchXEnd = Math.min(playerX + 400, worldWidth);
	searchY = playerY - 200;
	searchGap = gap;
	searchWorldWidth = worldWidth;
	searchWorldHeight = worldHeight;
	searchCallback = callback;
}

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
	original(self, message, client_id);

	const command = message.Text;
	let mPlayer = Main.player[Main.myPlayer];

	if (command.startsWith('/plantera') || command.startsWith('/bulb') || command.startsWith('/psearch')) {
		if (!mPlayer.ZoneJungle) return Main.NewText(`${translater.OnlyInJungle()}`, 255, 0, 0);

		const worldWidth = Main.maxTilesX;
		const worldHeight = Main.maxTilesY;

		startPlanteraSearch(mPlayer, worldWidth, worldHeight, 2, function (found) {
			if (!found) {
				Main.NewText(`${translater.NoBulb()}`, 255, 0, 0);
			}
		});
	}
});

Main.DrawRain.hook((original, self) => {
	original(self);
	searchPlanteraIncremental();
});
