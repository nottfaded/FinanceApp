import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Typography } from "antd";
import { useUserStore } from "../../hooks/useUserStore";
import { useState } from "react";
import { AddBill, BillModalType } from "./AddBill";
import { getIcon } from "../../config/icons";

export function Bills() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [billUpdate, setBillUpdate] = useState(-1);
    const user = useUserStore();

    const showModal = () => {
        setBillUpdate(-1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setBillUpdate(-1);
        setIsModalOpen(false);
    };

    const showModalCard = (key : number) => {
        setBillUpdate(key);
        setIsModalOpen(true);
    }

    return (
        <div className="size-full flex flex-col items-center p-6 gap-3">
            <div className="flex flex-col items-center">
                <Typography.Text type="secondary">Total:</Typography.Text>
                <Typography className="text-3xl">{user.getBillTotal()}$</Typography>
            </div>
            <div className="h-full w-full overflow-auto">
                {
                    user.bills.length > 0
                        ? user.bills.map((bill, key) => (
                            <Card
                                onClick={() => showModalCard(key)}
                                key={key}
                                className="m-2"
                                styles={{
                                    body: {
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }
                                }}
                            >
                                {getIcon(bill.category)}
                                <Typography className="ml-3 text-xl">{bill.name}</Typography>
                                <Typography className="flex-1 text-end text-xl">{bill.amount}$</Typography>
                            </Card>
                        ))
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </div>
            <Button
                type="primary"
                className="shadow-none"
                icon={<PlusOutlined />}
                shape="circle"
                size="large"
                onClick={showModal}
            />

                {
                    billUpdate === -1
                    ? ( <AddBill isModalOpen={isModalOpen} closeModal={closeModal} from={BillModalType.Create} />)
                    : ( <AddBill isModalOpen={isModalOpen} closeModal={closeModal} from={BillModalType.Update} defBillId={billUpdate} />)
                }
           
        </div>
    )
}


