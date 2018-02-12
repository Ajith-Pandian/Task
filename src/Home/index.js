import React, { Component } from "react";
import { FlatList, ToastAndroid, View, StyleSheet } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";

import { Loader, PlaceHolder } from "../Components";
import TodoItem from "./TodoItem";
import Header from "./Header";
import { fetchTodo } from "../Store/Actions/TodoActions";
import { ITEM_PADDING } from "../Constants";

class TodoList extends Component {
  onEndReached = () => {
    let { _fetchTodo, page } = this.props;
    _fetchTodo(page + 1);
  };
  componentDidMount() {
    let { _fetchTodo, page } = this.props;
    _fetchTodo(page);
  }
  render() {
    let { todos, isLoading, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          onAddPress={() => navigation.navigate("Details", { isNew: true })}
        />
        <View style={styles.sContainer}>
          {todos && todos.length > 0 ? (
            <FlatList
              data={todos}
              scrollEventThrottle={16}
              keyExtractor={item => item.id.toString()}
              onEndReached={() => this.onEndReached()}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => {
                let isLast = todos.length - 1 === index;
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
              ListFooterComponent={() => (isLoading ? <Loader /> : null)}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {isLoading ? <Loader /> : <PlaceHolder />}
            </View>
          )}
        </View>
      </View>
    );
  }
}

TodoList.navigationOptions = {
  header: null
};
const mapStateToProps = ({ Todos }) => {
  let { todos, totalPages, page, isLoading } = Todos;

  return {
    todos,
    totalPages,
    page,
    isLoading
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  _fetchTodo: page => dispatch(fetchTodo(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

const styles = StyleSheet.create({
  sContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});
