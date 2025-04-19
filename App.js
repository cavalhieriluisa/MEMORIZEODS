import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import InitScreen from './components/init';
import LoginScreen from './components/login';
import CadastroScreen from './components/cadastro';
import HomeScreen from './components/homescreen';
import JogosScreen from './components/jogosscreen';
import SobreScreen from './components/sobrescreen';
import DesafioScreen from './components/desafios';
import ArtigoScreen from './components/artigos';
import PerfilScreen from './components/perfil';

const Drawer = createDrawerNavigator();

//Drawer  com fundo gradiente
function CustomDrawerContent(props) {
  return (
    <LinearGradient
      colors={['#00b4d8', '#a0f1ea']}
      style={{ flex: 1, paddingTop: 40 }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          header: () => (
            <LinearGradient
              colors={['#a0f1ea', '#00b4d9']}
              style={{
                height: 100,
                paddingTop: 40,
                paddingHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              }}
            >
              {/* Botão do menu */}
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <MaterialCommunityIcons name="menu" size={28} color="#fff" />
              </TouchableOpacity>

              {/* Título */}
              <Text
                style={{
                  fontFamily: 'Poppins_700Bold',
                  fontSize: 18,
                  color: '#fff',
                }}
              >
                Memorize ODS
              </Text>

              {/* Logo redonda */}
              <TouchableOpacity>
                <Image
                  source={require('./components/assets/logo.png')}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            </LinearGradient>
          ),
          drawerStyle: {
            backgroundColor: 'transparent', // transparente pra mostrar o gradiente
            width: 240,
          },
          drawerLabelStyle: {
            fontSize: 18,
            fontWeight: '700',
            color: '#fff',
            marginLeft: -10,
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Jogos"
          component={JogosScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="gamepad-variant" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Sobre Nós"
          component={SobreScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="information-outline" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Desafios"
          component={DesafioScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="flag-checkered" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Artigos"
          component={ArtigoScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book-open-page-variant" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color="#fff" size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Init"
          component={InitScreen}
          options={{ headerShown: false, drawerLabel: () => null, title: null }}
        />
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false, drawerLabel: () => null, title: null }}
        />
        <Drawer.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: false, drawerLabel: () => null, title: null }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
