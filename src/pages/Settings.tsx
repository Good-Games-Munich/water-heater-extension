import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSettingsStore } from '@/hooks/stores/useSettingsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    guildId: z.string().min(1),
    fillerTag: z.string().min(1),
    passwordManagerUrl: z.string().optional(),
    wikiUrl: z.string().optional(),
});

export const Settings = () => {
    const queryClient = useQueryClient();

    const { settings, update } = useSettingsStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: settings,
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Map empty values to undefined
        const processedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value === '' ? undefined : value]),
        );

        update(processedData);
        await queryClient.invalidateQueries();
        form.reset(processedData);
    };

    return (
        <Card className="w-full sm:w-1/2 m-auto">
            <CardHeader>
                <CardTitle>{chrome.i18n.getMessage('settingsTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
                <FormProvider {...form}>
                    <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="guildId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {chrome.i18n.getMessage('settingsGuildIdLabel')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={chrome.i18n.getMessage(
                                                'settingsGuildIdPlaceholder',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {chrome.i18n.getMessage('settingsGuildIdDescription')}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fillerTag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {chrome.i18n.getMessage('settingsFillerTagLabel')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={chrome.i18n.getMessage(
                                                'settingsFillerTagPlaceholder',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {chrome.i18n.getMessage('settingsFillerTagDescription')}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordManagerUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {chrome.i18n.getMessage('settingsPasswordManagerUrlLabel')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={chrome.i18n.getMessage(
                                                'settingsPasswordManagerUrlPlaceholder',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {chrome.i18n.getMessage(
                                            'settingsPasswordManagerUrlDescription',
                                        )}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wikiUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {chrome.i18n.getMessage('settingsWikiUrlLabel')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={chrome.i18n.getMessage(
                                                'settingsWikiUrlPlaceholder',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {chrome.i18n.getMessage('settingsWikiUrlDescription')}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button
                                className="mr-2"
                                disabled={!form.formState.isDirty}
                                onClick={() => form.reset()}
                            >
                                {chrome.i18n.getMessage('settingsReset')}
                            </Button>
                            <Button
                                disabled={!form.formState.isDirty || !form.formState.isValid}
                                type="submit"
                            >
                                {chrome.i18n.getMessage('settingsSubmit')}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
};
