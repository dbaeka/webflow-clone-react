import request, {requestType} from '../../utilities/request';

const config = {
    headers: {'Access-Control-Allow-Origin': '*'},
};

export function fetchFiles() {
    const requestURL = '/api/load_directory';
    return request(requestURL, requestType.GET, config);
}

export function moveFile({source, dest}) {
    const requestURL = '/api/move_directory';
    return request(requestURL, requestType.GET, {...config, param: source, dest});
}