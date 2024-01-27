import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function ConsumerDashboardScreen(props){

    const [adminProductIds, setAdminProductIds] = useState([]);
    const [adminProducts, setAdminProducts] = useState();

    const { navigation } = props;

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/products.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            setAdminProductIds(objKeys);
            setAdminProducts(result)
        })();
    }, []);

    return <View className={'flex flex-1 p-3'}>
    <View className={'flex flex-1'}>
    {
        adminProductIds.length > 0 ?
        <FlashList
        estimatedItemSize={4}
        data={adminProductIds}
        renderItem={({ item, index }) =>{

            console.log(index);
            if(index <= 2){
                return <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                            <View className={'flex w-full items-center'}>
                                <Image className={'w-full h-44 mb-3 rounded-lg'} src={adminProducts[item].image ? adminProducts[item]?.image : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081'} />
                            </View>
                            <View className={'flex flex-row items-center justify-between mb-3'}>
                                <Text className={'text-lg'}>{adminProducts[item] ? adminProducts[item].name : newData.name}</Text>
                                <Text className={'text-lg'}>Php. {adminProducts[item] ? adminProducts[item].price : newData.price} / Kilo</Text>
                            </View>

                            <Text className={'mb-3'}>{adminProducts[item] ? adminProducts[item].description : newData.description}</Text>
                            <View className={'flex  w-2/4 py-2 px-2 bg-green-200 rounded-full mb-3'}>
                                <Text className={'text-center'}>{adminProducts[item] ? adminProducts[item].category : newData.category}</Text>
                            </View>
                            <View className={'flex'}>
                                {/* <TouchableOpacity className={'bg-red-500 rounded-lg py-2 px-4'}>
                                    <Text className={'text-white text-center'}>Delete</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
            }
            
        }}
        />
        : <Text className={'text-center'}>No Data.</Text>
    }
    <TouchableOpacity onPress={()=> navigation.navigate('ConsumerProduct')} className={'bg-blue-600 rounded-xl py-4 px-4'}>
        <Text className={'text-center text-white'}>View More</Text>
    </TouchableOpacity>
    </View>
</View>
}