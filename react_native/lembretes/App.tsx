import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput, 
  View 
} from 'react-native';

import {
  useState
} from 'react'

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
            <Text>{lembrete.item.texto}</Text>
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
    margin: 8
  }
});
