import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/** Cores da aplicação — altere aqui, não no Aura. */
export const CORES = {
  fundo: '#b0d5ff',
  superficie: '#ffffff',
  texto: '#1f2937',
  textoCampo: '#1a1a1a',
  placeholder: '#6b7280',
  borda: '#e8e8e4',
  erro: '#d71d1d',
} as const;

const campo = {
  background: CORES.superficie,
  color: CORES.textoCampo,
  placeholderColor: CORES.placeholder,
  disabledBackground: CORES.superficie,
  disabledColor: CORES.textoCampo,
};

export const TEMA_CADERNO = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: { formField: campo },
      dark: { formField: campo },
    },
  },
});

export function aplicarTokens(raiz: CSSStyleDeclaration = document.documentElement.style): void {
  raiz.setProperty('--cor-fundo', CORES.fundo);
  raiz.setProperty('--cor-superficie', CORES.superficie);
  raiz.setProperty('--cor-texto', CORES.texto);
  raiz.setProperty('--cor-texto-campo', CORES.textoCampo);
  raiz.setProperty('--cor-placeholder', CORES.placeholder);
  raiz.setProperty('--cor-borda', CORES.borda);
  raiz.setProperty('--cor-erro', CORES.erro);
  raiz.setProperty('--p-inputtext-background', CORES.superficie);
  raiz.setProperty('--p-inputtext-color', CORES.textoCampo);
  raiz.setProperty('--p-textarea-background', CORES.superficie);
  raiz.setProperty('--p-textarea-color', CORES.textoCampo);
  raiz.setProperty('--p-autocomplete-background', CORES.superficie);
}
