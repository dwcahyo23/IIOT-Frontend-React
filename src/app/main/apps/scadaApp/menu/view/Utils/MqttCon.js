import { useEffect, useState } from 'react'
import * as mqtt from 'mqtt/dist/mqtt.min'

function MqttCon({ paloadTopic }) {
    const [client, setClient] = useState(null)
    const [isSubed, setIsSub] = useState(false)
    const [payload, setPayload] = useState({})
    const [connectStatus, setConnectStatus] = useState('Connect')

    const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    const host = 'ws://192.168.192.7:8884/mqtt'
    const options = {
        keepalive: 30,
        clientId,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        rejectUnauthorized: false,
    }

    useEffect(() => {
        setClient(mqtt.connect(host, options))
    }, [])

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                setConnectStatus('Connected')
                client.subscribe('zbOn', { qos: 0 })
                console.log('connection successful')
            })

            client.on('error', (err) => {
                console.error('Connection error: ', err)
                client.end()
            })

            client.on('reconnect', () => {
                setConnectStatus('Reconnecting')
            })

            client.on('message', (zbOn, message) => {
                const payload = {
                    topic: zbOn,
                    message: JSON.parse(message.toString()),
                }
                setPayload(payload)
                paloadTopic(payload)
                // console.log(`received message: ${message} from topic: ${topic}`)
            })
        }
    }, [client])

    return <div></div>
}

export default MqttCon
