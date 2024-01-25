import {useEffect, useMemo, useRef, useState} from "react";
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import {get} from "../../../../helper/api";

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);

    useEffect(() => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setFetching(true);
        fetchOptions().then((newOptions) => {
            if (fetchId !== fetchRef.current) {
                return;
            }
            setOptions(newOptions);
            setFetching(false);
        });
    }, []);


    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
        />
    );
}

async function fetchDomains(username) {
    const urlObj = {
        url: 'https://gotest-xj8jikrn.b4a.run/domains',
        query: {
            from: 0,
            size: 100,
            authorizer: "some_admin_id",
            source: 'email_generator_frontend'
        },
        headers: {
            'Access-Control-Request-Method' : 'GET'
        }
    };
    const response = await get({ urlObj });
    return response.data.domains.map(({ name }) => ({ label: name, value: name }));
}

const Filters = ({ setFilterValue, filterValue }) => {
    return (
        <DebounceSelect
            mode="multiple"
            value={filterValue}
            placeholder="Select domains"
            fetchOptions={fetchDomains}
            onChange={(newValue) => {
                setFilterValue(newValue);
            }}
            style={{
                width: '100%',
            }}
        />
    );
};

export default Filters;