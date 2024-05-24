import {
  useState,
  useEffect
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

import axios from 'axios';

type Lembrete = {
  id?: string;
  texto: string;
}

export default function App() {
  const [lembrete, setLembrete] = useState <Lembrete | null>(null)
  const [lembretes, setLembretes] = useState <Lembrete[]> ([])
  const [emModoEdicao, setEmModoEdicao] = useState(false)
  useEffect(() => {
    const vai: Function = async () => {
      const lembretes = (await axios.get('http://localhost:3000/lembretes')).data
      setLembretes(lembretes)
    }
    vai()
  }, [])
  const adicionar = () => {
    if(lembrete?.texto === '')
        alert('Lembrete não pode ser vazio')
    else{
      const novoLembrete: Lembrete = {
        id: Date.now().toString(),
        texto: lembrete!.texto
      }
  
      setLembretes( lembretesAtual => [
        novoLembrete,
        ...lembretesAtual
      ])
      setLembrete({texto: ''})
    }
  }

  const remover: Function = (lembrete: Lembrete): void => {
    setLembretes(lembretesAtual => lembretesAtual.filter(l => l.id !== lembrete.id))
  }

  const atualizar = () => {
    console.log('atualizar')
    console.log(lembrete)
    //1. Atualizar a lista, para que o novo texto seja exibido (é preciso encontrar o lembrete de id igual ao daquele que foi atualizado)
    const aux: Lembrete[] = lembretes.map(l => l.id === lembrete!.id ? lembrete! : l)
    console.log(aux)
    setLembretes(aux)
    //2. Limpar o campo textual
    setLembrete({texto: ''})
    //3. Troca o modo da aplicação, ela deixa de estar em modo de atualização e volta ao modo de cadastro
    setEmModoEdicao(false)
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='Digite um lembrete...'
        value={lembrete?.texto}
        onChangeText={(lembreteDigitado) => setLembrete({id: lembrete?.id, texto: lembreteDigitado })}
      />
      <Pressable
        style={styles.button}
        onPress={emModoEdicao ? atualizar : adicionar}>
        <Text
          style={styles.buttonText}>
          {/* Salvar lembrete ou Atualizar lembrete*/}
          {`${emModoEdicao ? 'Atualizar' : 'Adicionar'} lembrete`}
        </Text>
      </Pressable>
      <FlatList
        keyExtractor={item => item.id!}
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
              <Pressable
                onPress={() => {
                    console.log(lembrete.item.id)
                    setLembrete(lembrete.item)
                    setEmModoEdicao(true)
                }}>
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemText:{
    width: '70%',
    textAlign: 'center',
    // alignSelf: 'center'
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '30%'
  }
});
