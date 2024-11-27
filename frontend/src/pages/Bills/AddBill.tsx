import { Modal, Typography, InputNumber, Input, Avatar, Select, Checkbox, Button, message } from "antd";
import { useEffect, useState } from "react";
import { BILL_ICONS, getIcon } from "../../config/icons";
import { RedoOutlined } from "@ant-design/icons";
import { useUserStore } from "../../hooks/useUserStore";
import Bill from "../../types/Bill";

export enum BillModalType { Create = 'Create', Update = 'Update' }

interface AddBillPropBase {
    isModalOpen: boolean;
    closeModal: () => void;
}
interface AddBillCreateProps extends AddBillPropBase {
    from: BillModalType.Create;
    defBillId?: never;
}
interface AddBillUpdateProps extends AddBillPropBase {
    from: BillModalType.Update;
    defBillId: any;
}
type AddBillProp = AddBillCreateProps | AddBillUpdateProps;

const MAX_BILLS = 3;
const COLORS: `#${string}`[] = [
    "#ff2d00",
    "#2eff00",
    "#00f0ff",
    "#0027ff",
    "#ff00ff",
]
const CURRENCY = [
    'USD',
    // 'EUR'
]

export function AddBill(
    { isModalOpen, closeModal, from, defBillId }: AddBillProp
) {
    const userStore = useUserStore();

    const [messageApi, contextHolder] = message.useMessage();

    const [selectIconModal, setSelectIconModal] = useState(false);

    const [accName, setAccName] = useState<any>('Bill name');
    const [amount, setAmount] = useState<any>(1);
    const [selectIconKey, setSelectIconKey] = useState(0);
    const [selectColorKey, setSelectColorKey] = useState(0);
    const [selectCurrencyKey, setSelectCurrencyKey] = useState(0);
    const [inTotal, setInTotal] = useState(true);

    const [icon, setIcon] = useState<Category>({
        name: '',
        color: COLORS[selectColorKey],
        iconName: BILL_ICONS[selectIconKey].iconName
    });

    const onCancel = () => {
        closeModal();
        resetData();
    }
    const onCheck = () => {
        setInTotal(!inTotal);
    }

    const resetData = () => {
        setAccName('Bill name');
        setAmount(1);
        setSelectIconKey(0);
        setSelectColorKey(0);
        setSelectCurrencyKey(0);
        setInTotal(true);
    }

    const onRemove = () => {
        if (defBillId == -1) return;

        userStore.bills.splice(defBillId, 1);
        const newBills = userStore.bills;

        userStore.setUserData({
            bills: newBills
        });

        resetData();
        closeModal()
    }

    const onClick = () => {
        const newBill : Bill = {
            name: accName,
            amount: amount,
            category: icon,
            inTotal: inTotal
        };

        if(from === BillModalType.Update){
            const prevBill = userStore.bills[defBillId];
            
            if(JSON.stringify(newBill) === JSON.stringify(prevBill)) {
                messageApi.info('You need to change something!');
                return;
            }

            userStore.updateBillsData(defBillId, newBill);
        } else {
            if(userStore.bills.length >= MAX_BILLS){
                messageApi.error(`At the moment you can only create ${MAX_BILLS} bills`);
                return;
            }
            userStore.setUserData({
                bills: [...userStore.bills, newBill]
            });
        }

        // promise with create

        onCancel();
    }

    useEffect(() => {
        setIcon({
            name: '',
            color: COLORS[selectColorKey],
            iconName: BILL_ICONS[selectIconKey].iconName
        })
    }, [selectColorKey, selectIconKey]);

    useEffect(() => {
        if (userStore.loading || defBillId === undefined) return;

        const bill = userStore.bills[defBillId];

        setAccName(bill.name);
        setAmount(bill.amount);

        const iconKey = BILL_ICONS.findIndex(i => i.iconName == bill.category.iconName);
        setSelectIconKey(iconKey);

        const colorKey = COLORS.findIndex(i => i == bill.category.color);
        setSelectColorKey(colorKey);

        setSelectCurrencyKey(0);

        setInTotal(bill.inTotal);
    }, [isModalOpen])

    return (
        <Modal
            title="Create Bill"
            open={isModalOpen}
            onCancel={onCancel}
            centered={true}
            footer={(
                <>
                    <Button type="primary" onClick={onClick}>
                        {from}
                    </Button>
                    {from === BillModalType.Update &&
                        <Button variant="solid" color="danger" onClick={onRemove}>
                            Remove
                        </Button>
                    }
                </>
            )}
        >
            {contextHolder}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <Typography.Text type="secondary">amount:</Typography.Text>
                    <InputNumber
                        min={1}
                        value={amount}
                        onChange={(value) => { setAmount(value) }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Typography.Text type="secondary">account name:</Typography.Text>
                    <Input
                        placeholder="Enter account name"
                        value={accName}
                        onChange={(e) => { setAccName(e.target.value) }}
                    />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Typography.Text type="secondary">icon:</Typography.Text>
                    {
                        getIcon(icon, 35)
                    }
                    <Button
                        type="primary"
                        className="shadow-none"
                        icon={<RedoOutlined />}
                        shape="circle"
                        size="middle"
                        onClick={() => setSelectIconModal(true)}
                    />
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <Typography.Text type="secondary">colors:</Typography.Text>
                    {COLORS.map((i, key) => (
                        <div
                            key={key}
                            onClick={() => setSelectColorKey(key)}
                            className={`flex items-center justify-center p-1 cursor-pointer ${selectColorKey === key && 'border border-primary border-solid rounded-md'}`}
                        >
                            <Avatar size={15} style={{ backgroundColor: i }} />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-1">
                    <Typography.Text type="secondary">currency:</Typography.Text>
                    <Select
                        showSearch
                        placeholder="Select currency"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={CURRENCY.map((i, key) => ({
                            value: key,
                            label: i
                        }))}
                        onSelect={(value) => { setSelectCurrencyKey(value); }}
                        defaultValue={selectCurrencyKey}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Checkbox checked={!inTotal} onClick={onCheck}>Do not include in total balance</Checkbox>
                </div>
            </div>

            <SelectIconModal
                selectIconModal={selectIconModal}
                setSelectIconModal={setSelectIconModal}
                selectIconKey={selectIconKey}
                setSelectIconKey={setSelectIconKey}
            />

        </Modal>
    )
}

interface SelectIconModalProp {
    selectIconModal: boolean;
    setSelectIconModal: (val: boolean) => void;
    selectIconKey: number;
    setSelectIconKey: (val: number) => void;
}

function SelectIconModal({ selectIconModal, setSelectIconModal, selectIconKey, setSelectIconKey }: SelectIconModalProp) {

    return (
        <Modal
            open={selectIconModal}
            onCancel={() => setSelectIconModal(false)}
            centered={true}
            footer={(<></>)}
        >
            <div className="pt-4 grid grid-cols-9 gap-2">
                {BILL_ICONS.map((i, key) => (
                    <div
                        className={`cursor-pointer flex items-center justify-center pt-1 pb-1 ${selectIconKey === key && 'border border-primary border-solid rounded-md'}`}
                        key={key}
                        onClick={() => { setSelectIconKey(key); setSelectIconModal(false) }}
                    >
                        {getIcon(i, 35)}
                    </div>
                ))}
            </div>
        </Modal>
    )
}