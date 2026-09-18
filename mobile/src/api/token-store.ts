import * as SecureStore from "expo-secure-store"; // 네이티브 기기의 암호화 저장소입니다.
import { Platform } from "react-native";

const key = "naeul.access-token";
let webToken: string | null = null; // 웹 미리보기는 새로고침하면 로그아웃됩니다.
export const tokenStore = {
  async get(): Promise<string | null> {
    return Platform.OS === "web" ? webToken : SecureStore.getItemAsync(key);
  },
  async set(token: string): Promise<void> {
    if (Platform.OS === "web") webToken = token;
    else await SecureStore.setItemAsync(key, token);
  },
  async clear(): Promise<void> {
    if (Platform.OS === "web") webToken = null;
    else await SecureStore.deleteItemAsync(key);
  },
};
