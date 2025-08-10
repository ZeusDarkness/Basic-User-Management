/*
* Author: Hỏi Dân IT - @hoidanit   
 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import { Space, Typography } from 'antd';
const { Text } = Typography;

const HomePage = () => {
    return (
        <div style={{ padding: 20 }}>
            <Space direction="vertical">
                <Text mark>
                    Bài tập thực hành fullstack 01:
                </Text>
                <Text code>- Sử dụng React (TypeScript) để làm giao diện</Text>
                <Text code>- Gọi APIs backend đã viết với Spring</Text>
                <Text code>- Hoàn thiện CRUD Users</Text>
            </Space>
        </div>
    )
}

export default HomePage;