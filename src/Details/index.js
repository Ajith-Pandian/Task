import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList
} from "react-native";
import { connect } from "react-redux";

import { Button } from "../Components";
import Header from "./Header";
import TodoItem from "../Home/TodoItem";
import {
  createTodo,
  updateTodo,
  removeTodo,
  fetchChildren
} from "../Store/Actions/TodoActions";

const Editor = props => {
  let { title, description, onTitleChange, onDescriptionChange } = props;
  let { sEditor, sEditorTitle, sEditorTextInput } = styles;
  return (
    <View style={sEditor}>
      <Text style={sEditorTitle}>Title:</Text>
      <TextInput
        multiline
        style={sEditorTextInput}
        placeholder="Title"
        onChangeText={title => onTitleChange(title)}
        value={title}
      />
      <Text style={[sEditorTitle, { marginTop: 10 }]}>Description:</Text>
      <TextInput
        multiline
        style={sEditorTextInput}
        placeholder="Description"
        onChangeText={description => onDescriptionChange(description)}
        value={description}
      />
    </View>
  );
};

class Details extends Component {
  constructor(props) {
    super(props);
    let { navigation } = props;
    let isNew = navigation.state.params ? navigation.state.params.isNew : false;
    let todo =
      navigation.state && navigation.state.params
        ? navigation.state.params.todo
        : { id: 0, title: "", description: "" };
    let id = !isNew ? todo.id : 0;
    let title = !isNew ? todo.title : "";
    let description = !isNew ? todo.description : "";
    let parentId = !isNew ? todo.parentId : 0;
    this.state = {
      isEdit: isNew,
      isNew,
      id,
      title,
      description,
      parentId,
      editedTitle: title,
      editedDescription: description
    };
  }
  componentDidMount() {
    let { _fetchChildren } = this.props;
    _fetchChildren(this.state.id);
  }
  render() {
    let {
      navigation,
      _createTodo,
      _updateTodo,
      _removeTodo,
      children
    } = this.props;
    let {
      id,
      isNew,
      isEdit,
      title,
      description,
      editedTitle,
      editedDescription
    } = this.state;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Header
          title={title}
          isEdit={isEdit}
          onEditPress={() => this.setState({ isEdit: true })}
          onBackPress={() => navigation.goBack()}
          onSavePress={() =>
            this.setState(
              {
                title: editedTitle,
                description: editedDescription,
                isEdit: false
              },
              () => {
                let { isNew, id, title, description } = this.state;
                isNew
                  ? _createTodo({ id, title, description })
                  : _updateTodo(id, title, description);
                navigation.goBack();
              }
            )
          }
          onCancelPress={() =>
            isNew ? navigation.goBack() : this.setState({ isEdit: false })
          }
          onDeletePress={() => {
            _removeTodo(id);
            navigation.goBack();
          }}
          onAddChild={() =>
            navigation.navigate("Details", {
              isNew: true,
              parentId: this.state.id
            })
          }
        />
        {isEdit ? (
          <Editor
            title={editedTitle}
            description={editedDescription}
            onTitleChange={editedTitle => this.setState({ editedTitle })}
            onDescriptionChange={editedDescription =>
              this.setState({ editedDescription })
            }
          />
        ) : (
          <Text style={styles.sDescription}>{description}</Text>
        )}
        {children && children.length > 0 ? (
          <FlatList
            style={{ marginTop: 20 }}
            data={children}
            scrollEventThrottle={16}
            keyExtractor={item => item.id.toString()}
            onEndReachedThreshold={0.5}
            renderItem={({ item, index }) => {
              return (
                <TodoItem
                  key={index}
                  todo={item}
                  onPress={() => {
                    navigation.navigate("Details", {
                      todo: item
                    });
                  }}
                />
              );
            }}
          />
        ) : null}
      </ScrollView>
    );
  }
}
Details.navigationOptions = { header: null };

const mapStateToProps = ({ Todos }) => {
  let { todos, children } = Todos;
  return {
    todos,
    children
  };
};

const mapDispatchToProps = dispatch => ({
  _createTodo: todo => dispatch(createTodo(todo)),
  _removeTodo: id => dispatch(removeTodo(id)),
  _fetchChildren: id => dispatch(fetchChildren(id)),
  _updateTodo: (id, title, description) =>
    dispatch(updateTodo(id, title, description))
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  sContainer: {
    flex: 1
  },
  sDescription: {
    backgroundColor: "#FFF",
    paddingVertical: 10,
    paddingHorizontal: 40
  },
  sEditor: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  sEditorTitle: { fontSize: 18, fontWeight: "bold" },
  sEditorTextInput: { fontSize: 16 }
});
