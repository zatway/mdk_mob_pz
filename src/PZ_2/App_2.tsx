import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header.tsx';
import PersonalInfo from './components/PersonalInfo.tsx';
import Menu from './components/Menu.tsx';
import Gallery from './components/Gallery.tsx';
import Projects from './components/Projects.tsx';

const App_2 = () => {
    const [selectTab, setSelectTab] = React.useState<number>(1);
    const handleChangeTab = (tab: string) => {
        switch (tab) {
            case 'Фото':
                setSelectTab(1);
                break;
            case 'Проекты':
                setSelectTab(2);
                break
            case 'Достижения':
                setSelectTab(3);
                break;
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header />
                <PersonalInfo />
                <Menu handleChangeTab={handleChangeTab}/>
                {selectTab === 1 ? <Gallery /> : selectTab === 2 ? <Projects /> : <></> }
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
export default App_2;
