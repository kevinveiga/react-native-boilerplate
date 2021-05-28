import React, { ReactElement } from 'react';

import { P } from '../Text/P';

import { variable } from '../../Style/variable';

export default function FooterDefault(): ReactElement {
    return (
        <>
            <P color={variable.colorWhite} textAlign="center">
                2002-2019 LIBERTA AGENTES AUTÔNOMOS DE INVESTIMENTOS S/S LTDA CNPJ 06.158.905/0001-70
            </P>

            <P color={variable.colorWhite} fontSize={10} textAlign="center">
                Av. Dr. Nilo Peçanha, 2900 - Sala 1202 - Chácara das Pedras, Porto Alegre/RS, CEP: 91330-001
            </P>
        </>
    );
}
