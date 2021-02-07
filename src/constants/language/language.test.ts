import { LanguageEnum, languages } from '@constants/language/language';

test('Checks if the typescript language name can be found.', () => {
    const languageData = languages[LanguageEnum.typescript];
    expect(languageData.name).toBe('typescript');
});