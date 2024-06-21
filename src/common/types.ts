import { TFunction, i18n } from "i18next";

export type Lang = "en" | "zh" | "ja";
export type Translator = {
    translate: TFunction<"translation", undefined>,
    i18n: i18n
};
export type LanguageOrder = "1st" | "2nd";