import pandas as pd

# 데이터
data = [33, 39, 5, 9, 35, 55, 85, 74, 19, 60, 31, 18, 27, 15, 15, 18, 29, 89, 14, 37, 17, 17, 15, 5, 82, 76, 0, 7, 58, 2, 54, 19, 90, 66, 57, 51, 41, 2, 0, 10, 2, 18, 4, 8, 91, 100, 68, 89, 8, 13, 57, 5, 6, 32, 59, 0, 18, 91, 48, 33, 10, 85, 84, 10, 42, 15, 62, 21, 16, 38, 55, 79, 85, 17, 61, 6, 29, 8, 29, 1, 9, 47, 5, 9, 0, 26, 17, 53, 49, 11, 11, 35, 4, 13, 86, 20, 58, 53, 80, 8, 18, 2, 17, 12, 42, 45, 40, 78, 26, 12, 99, 14, 12, 5, 1, 28, 11, 4, 14, 2, 55, 69, 10, 14, 74, 89, 6, 18, 68, 0, 11, 38, 40, 80, 77, 14, 60, 2, 5, 14, 13, 10, 41, 95, 64, 29, 6, 17, 17, 39, 9, 67, 58, 44, 21, 4, 56, 21, 23, 14, 42, 54, 100, 61, 2, 96, 1, 9, 7, 26, 12, 14, 69, 14, 3, 12, 31, 82, 13, 9]

# 데이터프레임 생성
df = pd.DataFrame(data, columns=["Numbers"])

# 엑셀 파일로 저장
df.to_excel("numbers.xlsx", index=False)