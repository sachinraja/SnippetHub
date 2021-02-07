import pythonIcon from 'simple-icons/icons/python';
import javascriptIcon from 'simple-icons/icons/javascript';
import typescriptIcon from 'simple-icons/icons/typescript';
import csharpIcon from 'simple-icons/icons/csharp';
import elixirIcon from 'simple-icons/icons/elixir';

import type { SimpleIcon } from 'simple-icons';

class Language {
    name: string;
    color: string;
    icon: SimpleIcon;
    iconColor: string;

    constructor(name: string, color: string, icon: SimpleIcon, iconColor: string) {
        this.name = name;
        this.color = color;
        this.icon = icon;
        this.iconColor = iconColor;
    }
}

enum LanguageEnum {
    python,
    javascript,
    typescript,
    csharp,
    elixir
}

const languages: Record<LanguageEnum, Language> = {
    [LanguageEnum.python]: new Language('python', 'green', pythonIcon, '#059669'),
    [LanguageEnum.javascript]: new Language('javascript', 'yellow', javascriptIcon, '#D97706'),
    [LanguageEnum.typescript]: new Language('typescript', 'blue', typescriptIcon, '#2563EB'),
    [LanguageEnum.csharp]: new Language('C#', 'purple', csharpIcon, '#7C3AED'),
    [LanguageEnum.elixir]: new Language('elixir', 'indigo', elixirIcon, '#4F46E5')
}

export {LanguageEnum, languages};