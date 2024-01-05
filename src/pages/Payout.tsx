import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { useState } from 'react';

export const Payout = () => {
    const [amount, setAmount] = useState<number>(1);

    const fiftyPercent = Math.floor(amount * 0.5 * 100) / 100;
    const thirtyPercent = Math.floor(amount * 0.3 * 100) / 100;
    const twentyPercent = Math.floor(amount * 0.2 * 100) / 100;
    const remainingAmount = amount - (fiftyPercent + thirtyPercent + twentyPercent);

    return (
        <Card className="w-full sm:w-1/2 m-auto">
            <CardHeader>
                <CardTitle>{chrome.i18n.getMessage('payoutTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <Input
                        onChange={event => {
                            const value = Number.parseFloat(event.target.value);
                            if (Number.isNaN(value)) {
                                // Ignore the input or set it to a default value
                                return;
                            }

                            setAmount(value);
                        }}
                        step="0.01"
                        type="number"
                        value={amount}
                    />
                    <span className="ml-2">€</span>
                </div>
                <div className="mt-4 p-4">
                    <p className="mb-2">
                        50%: <span className="font-bold">{fiftyPercent}</span>€
                    </p>
                    <p className="mb-2">
                        30%: <span className="font-bold">{thirtyPercent}</span>€
                    </p>
                    <p className="mb-2">
                        20%: <span className="font-bold">{twentyPercent}</span>€
                    </p>
                    <p>
                        {chrome.i18n.getMessage('payoutRemainingLabel')}:{' '}
                        <span className="font-bold">{remainingAmount}</span>€
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
