import { Avatar, Button, Card, Divider, List, Skeleton } from "antd";
import { FinanceChart } from "../../components/FinanceChart";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

const data = [
    { category: 'Еда', amount: 500, color: '#FF6384' },
    { category: 'Транспорт', amount: 300, color: '#36A2EB' },
    { category: 'Развлечения', amount: 200, color: '#FFCE56' },
];

const tabListNoTitle = [
    {
        key: 'day',
        label: 'Day',
    },
    {
        key: 'week',
        label: 'Week',
    },
    {
        key: 'month',
        label: 'Month',
    },
    {
        key: 'year',
        label: 'Year',
    },
];

export function Express() {
    const [activeTab, setActiveTab] = useState<string>('day');

    const onTabChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <div className="min-h-full flex flex-col lg:flex-row" style={{ height: '80vh' }}>
            <Card
                className="w-fit m-auto"
                tabList={tabListNoTitle}
                activeTabKey={activeTab}
                onTabChange={onTabChange}
                tabProps={{
                    centered: true,
                    size: 'middle',
                }}
                styles={{
                    header: {
                        width: '100%'
                    }
                }}
            >
                <FinanceChart data={data} />
                <Button
                    type="primary"
                    className="absolute bottom-5 right-5 shadow-none"
                    icon={<PlusOutlined />}
                    shape="circle"
                />
            </Card>


            <Card className="w-full h-full lg:w-2/3 lg:h-2/3 overflow-y-scroll m-auto">
                <ListCheck />
            </Card>

        </div>
    )
}

interface DataType {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
}

const ListCheck: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            id="scrollableDiv"
            // style={{
            //   height: 400,
            //   overflow: 'auto',
            //   padding: '0 16px',
            //   border: '1px solid rgba(140, 140, 140, 0.35)',
            // }}
            className=" overflow-auto"
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 3}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                            <div>Content</div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};
