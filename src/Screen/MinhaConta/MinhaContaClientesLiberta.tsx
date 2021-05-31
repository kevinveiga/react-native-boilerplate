import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';

import { Card } from 'react-native-elements';

import { Spacer } from '../../Component/Layout/Spacer';
import { P } from '../../Component/Text/P';
import { Title2, Title3 } from '../../Component/Text/Title';

import { layout } from '../../Style/Layout';
import { variable } from '../../Style/variable';

export default function MinhaContaClientesLiberta(): ReactElement {
    return (
        <View style={layout.container}>
            <ScrollView>
                <Title2>Clientes Liberta</Title2>

                <P>Área exclusiva para clientes com relatórios econômicos e oportunidades de produtos financeiros para diferentes perfis.</P>

                <Spacer height={15} />

                <Title3>Escolha uma opção:</Title3>

                <Spacer />

                <View>
                    <Card>
                        <Title3 bold={true} color={variable.colorPrimary}>
                            Relatórios Research
                        </Title3>

                        <P>Indicadores econômicos e financeiros mensais exclusivos.</P>
                    </Card>

                    <Spacer height={15} />

                    <Card>
                        <Title3 bold={true} color={variable.colorPrimary}>
                            Produtos Financeiros (Em breve)
                        </Title3>

                        <P>Nossas últimas oportunidades de investimentos para seu perfil.</P>
                    </Card>

                    <Spacer height={15} />

                    <Card>
                        <Title3 bold={true} color={variable.colorPrimary}>
                            Calendário do investidor 2021
                        </Title3>

                        <P>Calendário com as datas importantes para você investidor.</P>
                    </Card>

                    <Spacer height={15} />

                    <Card>
                        <Title3 bold={true} color={variable.colorPrimary}>
                            Lives exclusivas para clientes
                        </Title3>

                        <P>Assista a lives exclusivas com nossos especialistas.</P>
                    </Card>

                    <Spacer height={15} />

                    <Card>
                        <Title3 bold={true} color={variable.colorPrimary}>
                            Imposto de Renda 2020 - Guia Prático
                        </Title3>

                        <P>Tudo o que você precisa saber para declarar o seu Imposto de Renda.</P>
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}
