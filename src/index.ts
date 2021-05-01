import { ICredentialRequestInput } from '@veramo/selective-disclosure';

/**
 * Interface that captures the DAG architecture of JSON-LD documents.
 */
export interface ISchemaNode {
  key: string;
  name?: string;
  url?: string;
  children?: ISchemaNode[];
  dataType?: DataType;
}

/**
 * Data types that are used in the claim context.
 */
export type DataType = 'NUMBER' | 'DATE' | 'BOOLEAN' | 'TEXT';

/**
 * Schemas that create a common context among different parties.
 * Used to quickly bootstrap verifiable credentials, presentations and selective disclosure requests.
 * TODO: add additional schemas from schema.org and others.
 */
export const schemas: [ISchemaNode] = [
  {
    key: 'https://schema.org',
    children: [
      {
        key: 'Person',
        url: 'https://schema.org/Person',
        children: [
          {
            key: 'birthDate',
            url: 'https://schema.org/birthDate',
            dataType: 'DATE',
          },
          {
            key: 'PostalAddress',
            url: 'https://schema.org/Person',
            children: [
              {
                key: 'postalCode',
                url: 'https://schema.org/postalCode',
                dataType: 'TEXT',
              },
            ],
          },
        ],
      },
      {
        key: 'Ticket',
        url: 'https://schema.org/Ticket',
        children: [
          {
            key: 'dateIssued',
            url: 'https://schema.org/dateIssued',
            dataType: 'DATE',
          },
          {
            key: 'ticketNumber',
            url: 'https://schema.org/ticketNumber',
            dataType: 'TEXT',
          },
          {
            key: 'totalPrice',
            url: 'https://schema.org/totalPrice',
            dataType: 'NUMBER',
          },
        ],
      },
      {
        key: 'VoteAction',
        url: 'https://schema.org/VoteAction',
        children: [
          {
            key: 'name',
            url: 'https://schema.org/name',
            dataType: 'TEXT',
          },
        ],
      },
      {
        key: 'Place',
        url: 'https://schema.org/Place',
        children: [
          {
            key: 'publicAccess',
            url: 'https://schema.org/publicAccess',
            dataType: 'BOOLEAN',
          },
        ],
      },
    ],
  },
];

/**
 * Interface that captures a constraint configuration.
 * The `js` string is a JS expression that can be evaluated with `eval()`.
 */
export interface IConstraint {
  js: string;
  desc: string;
}

/**
 * Interface that captures a combination of a claim and a constraint.
 * The claim is used to create selective disclouse requets in the authentication process. (ex. reveal your brithDate)
 * The constraint is used to evaluate the value that is revealed in the authentication process. (ex. is your birthDay before some date)
 */
export interface IClaimConstraintConfig {
  claim: ICredentialRequestInput;
  constraint: IConstraint;
}
