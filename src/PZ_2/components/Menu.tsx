import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface MenuProps {
    handleChangeTab: (tab: string) => void
}

const Menu: React.FC<MenuProps> = ({handleChangeTab}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleChangeTab('Фото')}>
                <Text style={styles.menuItem}>Фото</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeTab('Проекты')}>
                <Text style={styles.menuItem}>Проекты</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChangeTab('Достижения')}>
                <Text style={styles.menuItem}>Достижения</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 8,
        height: 30,
    },
    menuItem: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
    },
});
export default Menu;
