<?php

namespace LAuth\Libraries;

use JsonSerializable;

class Message implements JsonSerializable
{
    private string $code;
    private string $message;
    private array $extra;

    /**
     * @param string $code
     * @param string $message
     * @param array $extra
     */
    public function __construct(string $code = '', string $message = '', array $extra = [])
    {
        $this->code = $code;
        $this->message = $message;
        $this->extra = $extra;
    }

    /**
     * @return string
     */
    public function getCode(): string
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode(string $code): void
    {
        $this->code = $code;
    }

    /**
     * @return string
     */
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(string $message): void
    {
        $this->message = $message;
    }

    /**
     * @return array
     */
    public function getExtra(): array
    {
        return $this->extra;
    }

    /**
     * @param array $extra
     */
    public function setExtra(array $extra): void
    {
        $this->extra = $extra;
    }

    /**
     * @return array
     */
    public function jsonSerialize()
    {
        return [
            'code' => $this->code,
            'message' => $this->message,
            'extra' => $this->extra,
        ];
    }
}