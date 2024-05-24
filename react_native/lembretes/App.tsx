import {
  useState
} from 'react'

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput, 
  View 
} from 'react-native';

import {
  AntDesign
} from '@expo/vector-icons';

type Lembrete = {
  id: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState <string>('')
  const [lembretes, setLembretes] = useState <Lembrete[]> ([])
  const adicionar = () => {
    if(lembrete === '')
        alert('Lembrete não pode ser vazio')
    else{
      const novoLembrete: Lembrete = {
        id: Date.now().toString(),
        texto: lembrete
      }
  
      setLembretes( lembretesAtual => [
        novoLembrete,
        ...lembretesAtual
      ])
      setLembrete('')
    }
  }

  const remover: Function = (lembrete: Lembrete): void => {
    //exibe um Alert para confirmar se o usuário quer mesmo remover
    Alert.alert(
      //titulo
      'Remover lembrete',
      //mensagem
      `Deseja remover este lembrete? ${lembrete.texto}`,
      //coleção de botões
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            setLembretes(
              lembretesAtual => lembretesAtual.filter(item => item.id !== lembrete.id)
            )
          }
        }
      ]
    )
    //busca na lista pelo id do lembrete
    //remove da lista
    //atualiza o estado
  }

  const atualizar = () => {
    
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='Digite um lembrete...'
        value={lembrete}
        onChangeText={setLembrete}
      />
      <Pressable
        style={styles.button}
        onPress={adicionar}>
        <Text
          style={styles.buttonText}>
          Salvar lembrete
        </Text>
      </Pressable>
      <FlatList
        keyExtractor={item => item.id}
        style={styles.list} 
        data={lembretes}
        renderItem={lembrete => (
          <View 
            style={styles.listItem}>
            <Text
              style={styles.listItemText}>
                {lembrete.item.texto}
            </Text>
            <View
              style={styles.listItemButtons}>
              <Pressable
                onPress={() => remover(lembrete.item)}>
                <AntDesign
                  name="delete"
                  size={24}>
                </AntDesign>
              </Pressable>
              <Pressable>
                <AntDesign 
                  name='edit'
                  size={24}
                />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    textAlign: 'center',
    marginBottom: 12
  },
  button: {
    width: '80%',
    backgroundColor: '#0096F3', //material design blue 500,
    padding: 12,
    borderRadius: 4,
    marginBottom: 12
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  list: { 
    borderWidth: 1, 
    borderColor: 'gray', 
    width: '80%',
    borderRadius: 4 
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    margin: 8,
    flexDirection: 'row'
  },
  listItemText:{
    width: '70%',
    textAlign: 'center'
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%'
  }
});
