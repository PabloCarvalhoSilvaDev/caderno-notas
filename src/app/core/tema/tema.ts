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
  sucesso: '#15803d',
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
