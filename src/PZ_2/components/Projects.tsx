import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors.ts';

interface Project {
    id: string;
    title: string;
    description: string;
}

const projects: Project[] = [
    {id: '1', title: 'Проект 1', description: 'Описание проекта 1'},
    {id: '2', title: 'Проект 2', description: 'Описание проекта 2'},
    {id: '3', title: 'Проект 3', description: 'Описание проекта 3'},
    {id: '4', title: 'Проект 4', description: 'Описание проекта 4'},
    {id: '5', title: 'Проект 5', description: 'Описание проекта 5'},
];

const Projects = () => {
    const renderItem = ({item}: { item: Project }) => (
        <TouchableOpacity style={styles.projectCard}>
            <Text style={styles.projectTitle}>{item.title}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <FlatList
                data={projects}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  projectCard: {
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: colors.textMedium,
  },
});

export default Projects;
