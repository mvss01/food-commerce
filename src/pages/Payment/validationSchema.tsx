import { isValidCNPJ, isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

export const schema = yup
  .object({
    fullName: yup.string().required('Nome completo obrigatório.').min(3, 'Nome completo obrigatório.').matches(/(\W.+\s).+/gi, 'Sobrenome obrigatório.'),
    email: yup.string().required('E-mail obrigatório.').email('E-mail invalido.'),
    mobile: yup.string().required('Informe seu número de celular.').transform((value) => value.replace(/[^\d]+/g, '')).test('validatePhone', 'Número de celualar invalido.', (value) => isValidPhone(value)),
    document: yup.string().required('CPF ou CNPJ obrigatório.').transform((value) => value.replace(/[^\d]+/g, '')).test('validationDocument', 'CPF ou CNPJ invalido.', (value) => isValidCPF(value) || isValidCNPJ(value)),
  })
  .required()

export type FieldValues = yup.InferType<typeof schema>
