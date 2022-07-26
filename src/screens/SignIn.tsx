
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Alert } from 'react-native';
import { useState } from 'react';

import Logo from '../assets/logo_primary.svg';
import { Envelope, Key } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import auth from '@react-native-firebase/auth';

export function SignIn() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {colors} = useTheme();

    function handleSignIn(){
        if(!email || !password){
            return Alert.alert('Informação','Informe e-mail e senha.');
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email.trim(), password) 
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Informação', 'E-mail inválido')
            }
            if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
                return Alert.alert('Informação', 'E-mail ou senha não encontrado')
            }

            return Alert.alert('Informação','Não foi possível acessar. Erro:' + error.code);
        });

        
    }

    return(
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo/>
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder="E-mail"
                mb={4} 
                InputLeftElement={<Icon as = {<Envelope color={colors.gray[300]}/>} ml={4} />} 
                onChangeText={setEmail}
            />
            <Input
                mb={8}
                placeholder="Senha"
                InputLeftElement={<Icon as = {<Key color={colors.gray[300]}/>} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}        
            />

            <Button
                title='Entrar'
                width='full'
                onPress={handleSignIn}
                isLoading={isLoading}
            />
            
        </VStack>
    )
}