// Author: Animatak \\
// I added an English translation in case there is an error in the future where you can't see which language is active.

const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');

const translations = {
    Portuguese: {
        West: "Oeste",
        East: "Leste",
        Surface: "Superfície",
        Underground: "Subterrâneo",
        Cave: "Caverna",
        OnlyInJungle: "Só é possível utilizar no Bioma da Selva!",
        BulbFinded: "Bulbo da Plantera encontrado em",
        NoBulb: "Não existem Bulbos da Plantera no momento!"
    },
    Spanish: {
        West: "Oeste",
        East: "Este",
        Surface: "Superficie",
        Underground: "Subterráneo",
        Cave: "Cueva",
        OnlyInJungle: "¡Sólo se puede utilizar en el Bioma de la Selva!",
        BulbFinded: "Bulbo de Plantera encontrado en",
        NoBulb: "¡No hay bulbos de Plantera en este momento!"
    },
    Italian: {
        West: "Ovest",
        East: "Est",
        Surface: "Superficie",
        Underground: "Sottosuolo",
        Cave: "Caverna",
        OnlyInJungle: "Utilizzabile solo nel bioma della giungla!",
        BulbFinded: "Bulbo di Plantera trovato in",
        NoBulb: "Nessun bulbo di Plantera al momento!"
    },
    French: {
        West: "Ouest",
        East: "Est",
        Surface: "Surface",
        Underground: "Souterrain",
        Cave: "Caverne",
        OnlyInJungle: "Ne peut être utilisé que dans le biome de la jungle!",
        BulbFinded: "Bulbe de Plantera trouvé à",
        NoBulb: "Aucun bulbe de Plantera pour le moment!"
    },
    German: {
        West: "Westen",
        East: "Osten",
        Surface: "Oberfläche",
        Underground: "Untergrund",
        Cave: "Höhle",
        OnlyInJungle: "Kann nur im Dschungel-Biom verwendet werden!",
        BulbFinded: "Plantera-Knolle gefunden in",
        NoBulb: "Keine Plantera-Knollen im Moment!"
    },
    Russian: {
        West: "Запад",
        East: "Восток",
        Surface: "Поверхность",
        Underground: "Подземелье",
        Cave: "Пещера",
        OnlyInJungle: "Можно использовать только в биоме джунглей!",
        BulbFinded: "Найден луковица Плантеры в",
        NoBulb: "В данный момент луковиц Плантеры нет!"
    },
    English: {
        West: "Westeeee",
        East: "Easteee",
        Surface: "Surfaceeee",
        Underground: "Undergroundeee",
        Cave: "Caveeee",
        OnlyInJungle: "Can only be used in the Jungle Biomeeeee!",
        BulbFinded: "Plantera Bulb found ateeeee",
        NoBulb: "No Plantera Bulbs at the momenteeeee!"
    },
    Default: {
        West: "West",
        East: "East",
        Surface: "Surface",
        Underground: "Underground",
        Cave: "Cave",
        OnlyInJungle: "Can only be used in the Jungle Biome!",
        BulbFinded: "Plantera Bulb found at",
        NoBulb: "No Plantera Bulbs at the moment!"
    }
};

function getCurrentCulture() {
    const cultures = GameCulture.CultureName;
    for (let cultureName in cultures) {
        if (GameCulture.FromCultureName(cultures[cultureName]).IsActive) {
            return cultureName;
        }
    }
    return 'Default';
}

const translater = {
    West() {
        const culture = getCurrentCulture();
        return translations[culture]?.West || translations.Default.West;
    },
    East() {
        const culture = getCurrentCulture();
        return translations[culture]?.East || translations.Default.East;
    },
    Surface() {
        const culture = getCurrentCulture();
        return translations[culture]?.Surface || translations.Default.Surface;
    },
    Underground() {
        const culture = getCurrentCulture();
        return translations[culture]?.Underground || translations.Default.Underground;
    },
    Cave() {
        const culture = getCurrentCulture();
        return translations[culture]?.Cave || translations.Default.Cave;
    },
    OnlyInJungle() {
        const culture = getCurrentCulture();
        return translations[culture]?.OnlyInJungle || translations.Default.OnlyInJungle;
    },
    BulbFinded() {
        const culture = getCurrentCulture();
        return translations[culture]?.BulbFinded || translations.Default.BulbFinded;
    },
    NoBulb() {
        const culture = getCurrentCulture();
        return translations[culture]?.NoBulb || translations.Default.NoBulb;
    }
};

export { translater };
