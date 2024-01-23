import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AddCategoryModal from "./components/AddCategoryModal";
import { useEffect, useState } from "react";

import { FlashList } from "@shopify/flash-list";


export default function CategoryScreen(props){

    const [isVisible, setIsVisible] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState();
    const [action, setAction] = useState(0);
    const [newData, setNewData] = useState({});

    useEffect(()=> {
        (async ()=> {
            const response = await fetch(`https://sean-aaccd-default-rtdb.asia-southeast1.firebasedatabase.app/categories.json`);
            const result = await response.json();
            const objKeys = Object.keys(result);

            setCategoryIds(objKeys);
            setCategories(result);

        })();
    }, [action]);

    return <View className={'flex flex-1 p-3'}>
        <AddCategoryModal setNewData={setNewData} setAction={setAction} isVisible={isVisible} setIsVisible={setIsVisible} />
        <TouchableOpacity className={'rounded-xl px-4 py-3 bg-blue-500 mb-5'} onPress={()=> {
            setIsVisible(true);
        }}>
            <Text className={'text-center text-white'}>Add Category</Text>
        </TouchableOpacity>
        <View className={"flex flex-1"}>
            {
                categoryIds.length > 0 ?
                <FlashList
                data={categoryIds}
                renderItem={({ item }) => <View className={'mb-3 rounded-lg shadow  p-5 bg-white'}>
                    <Text className={'text-lg'}>{categories[item] ? categories[item].name : newData.name}</Text>
                    <Text className={'mb-3'}>{categories[item] ? categories[item].description : newData.description}</Text>
                    {/* <View className={'flex'}>
                        <TouchableOpacity className={'bg-blue-500 rounded-lg py-2 px-4 mb-2'}>
                            <Text className={'text-white text-center'}>Add Product</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={'bg-red-500 rounded-lg py-2 px-4'}>
                            <Text className={'text-white text-center'}>Delete</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>}
                estimatedItemSize={200}
                />
                : <Text className={'text-center'}>No Data.</Text>
            }
        </View>
    </View>
}