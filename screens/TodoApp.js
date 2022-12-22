import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Constants from 'expo-constants';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

// You can import from local files
import Spacer from '../components/Spacer';
import ButtonIcon from '../components/ButtonIcon';

// or any pure javascript modules available in npm
import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';
import { FontAwesome as Icon } from '@expo/vector-icons';

// Import Redux and React Redux Dependencies
import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';

// Test Data
// const data = [
//   {id: 1, task: "Do this stuff"},
//   {id: 2, task: "Do another stuff"},
// ]

const TodoApp = ({ todo_list, addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  const handleAddTodo = () => {
    addTodo(task)
    setTask('')
  }

  const handleLogout = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  return (
    <View style={styles.container}>
      <Card title="Notes Title">
        <Text style={styles.paragraph}>Yasmin Anindy's Notes</Text>
      </Card>
      <Spacer />
      <Card>
        <Card.Content>
          <Title>Add Note Here</Title>
          
          <TextInput
            mode="outlined"
            label="Note"
            value={task}
            onChangeText={task => setTask(task)}
          />
          <Spacer/>
          <Button mode="contained" onPress={handleAddTodo}>
            Add Note
          </Button>           
        </Card.Content>
      </Card>
      <View>
      <TouchableOpacity onPress={handleLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <FancyAlert
        visible={visible}
        style={styles.alert}
      >
      <View>
        <Text style={styles.alertText}>you have been logout the application</Text>
      </View>
      
      </FancyAlert>
       </View>
      <Spacer />
      
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
            <Card>
              <Card.Title
                title={`Task#${item.id}`}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
              </Card.Content>
            </Card>
            <Spacer />
            </>
          );
        }}
      />
      <Spacer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#D09CFA',
    padding: 10,
    
  },
  paragraph: {
    margin: 24,
    color: '#472183',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logout: {
    right: -35,
    position: "absolute",
    bottom: -200,
    marginHorizontal: 100,
    backgroundColor: "#472183",
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  alert: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#472183',
    borderRadius: 50,
    width: '100%',
  },
  alertText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginTop: -16, 
    marginBottom: 32
  },
  logoutText: {
    color: 'white',
  },
});



const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoApp)
