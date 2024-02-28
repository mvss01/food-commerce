import { isValidCNPJ, isValidCPF, isValidPhone } from '@brazilian-utils/brazilian-utils'
import isValidCreditCard from 'card-validator'
import * as yup from 'yup'

export const schema = yup
  .object({
    fullName: yup.string().required('Nome completo obrigatório.').min(3, 'Nome completo obrigatório.').matches(/(\W.+\s).+/gi, 'Sobrenome obrigatório.'),
    email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
    mobile: yup.string().required('Informe seu número de celular.').transform((value) => value.replace(/[^\d]+/g, '')).test('validatePhone', 'Número de celualar inválido.', (value) => isValidPhone(value)),
    document: yup.string().required('CPF ou CNPJ obrigatório.').transform((value) => value.replace(/[^\d]+/g, '')).test('validationDocument', 'CPF ou CNPJ inválido.', (value) => isValidCPF(value) || isValidCNPJ(value)),
    zipCode: yup.string().required('CEP obrigatório.').transform((val) => val.replace(/[^\d]+/g, '')),
    street: yup.string().required('Endereço obrigatório.'),
    number: yup.string().required('Número obrigatório.'),
    complement: yup.string(),
    neighborhood: yup.string().required('Bairro obrigatório.'),
    city: yup.string().required('Cidade obrigatória.'),
    state: yup.string().required('Estado obrigatório.'),
    creditCardNumber: yup.string().required('Número do cartão obrigatório').transform((val) => val.replace(/[^\d]+/g, '')).test('validateCreditCardNumber', 'Número do cartão inválido.', (value) => isValidCreditCard.number(value).isValid),
    creditCardHolder: yup.string().required('Nome do titular obrigatório.').min(3, 'Nome do titular obrigatório.').matches(/(\W.+\s).+/gi, 'Nome do titular inválido.'),
    creditCardExpiration: yup.string().required('Validade do cartão obrigatória.').transform((value) => {
      const [month, year] = value.split('/')
      if (month && year && month.length === 2 && year.length === 2)
        return new Date(+`20${year}`, +month - 1, 1).toISOString()
      return value
    }).test('validateCreditCardExpiration', 'Cartão expirado.', (value) => new Date(value) >= new Date()),
    creditCardSecuritCode: yup.string().required('CVV obrigatório').transform((value) => value.replace(/[^\d]+/g, '')).min(3, 'CVV deve conter de 3 a 4 digitos.').max(4, 'CVV deve conter de 3 a 4 digitos.')
  })
  .required()

export type FieldValues = yup.InferType<typeof schema>
