export interface Especialidades {
    direito_administrativo: boolean;
    direito_civil: boolean;
    direito_empresarial: boolean;
    propriedade_intelectual: boolean;
    direito_ambiental: boolean;
    direito_financeiro_tributário: boolean;
    direito_processual: boolean;
    direito_trabalho: boolean;
    direito_previdenciário: boolean;
    direito_constitucional: boolean;
    direito_econômico_concorrencial: boolean;
    direito_penal: boolean;
    filosofia_direito: boolean;
    outros?: {[key: string]: boolean};
}